// sgroup is meant to help jobs that want to spawn a lot of workers that are
// all trying to meet the same success condition. This allows us to stop all
// work once we find a single success. This code is a modification of the error
// group package found here https://godoc.org/golang.org/x/sync/errgroup

// Package sgroup provides synchronization, success propagation, and Context
// cancelation for groups of goroutines working on subtasks of a common task.
package sgroup

import (
	"context"
	"sync"
)

// A Group is a collection of goroutines working on subtasks that are part of
// the same overall task.
//
// A zero Group is valid and does not cancel on error.
type Group struct {
	cancel func()

	wg sync.WaitGroup

	sOnce   sync.Once
	success interface{}
}

// WithContext returns a new Group and an associated Context derived from ctx.
//
// The derived Context is canceled the first time a function passed to Go
// returns a non-nil success or the first time Wait returns, whichever occurs
// first.
func WithContext(ctx context.Context) (*Group, context.Context) {
	ctx, cancel := context.WithCancel(ctx)
	return &Group{cancel: cancel}, ctx
}

// Wait blocks until all function calls from the Go method have returned, then
// returns the first non-nil error (if any) from them.
func (g *Group) Wait() interface{} {
	g.wg.Wait()
	if g.cancel != nil {
		g.cancel()
	}
	return g.success
}

// Go calls the given function in a new goroutine.
//
// The first call to return a non-nil success cancels the group; its success will be
// returned by Wait.
func (g *Group) Go(f func() interface{}) {
	g.wg.Add(1)

	go func() {
		defer g.wg.Done()

		if success := f(); success != nil {
			g.sOnce.Do(func() {
				g.success = success
				if g.cancel != nil {
					g.cancel()
				}
			})
		}
	}()
}
