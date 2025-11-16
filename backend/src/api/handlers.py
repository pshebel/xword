from src.db import run_query


def get_puzzle():
    """Get a random puzzle with clues"""
    try:
        # SELECT a random puzzle
        row = run_query(
            "SELECT id, size FROM puzzles ORDER BY RANDOM() LIMIT 1;",
            fetch=True
        )

        if not row:
            return {"error": "No puzzle found"}, 404

        puzzle_id, size = row[0]

        # FULL SQL identical to Go version
        query = """
            WITH random_prompt AS (
                SELECT id AS prompt_id
                FROM prompts
                ORDER BY RANDOM()
                LIMIT 1
            )
            SELECT
                pdw.text AS padded_word_text,
                c.text AS clue_text,
                pw.across,
                pw.idx
            FROM puzzle_words pw
            JOIN puzzles p ON p.id = %s
            JOIN padded_words pdw ON pdw.id = pw.padded_word_id
            JOIN words w ON w.id = pdw.word_id
            JOIN random_prompt rp ON TRUE
            JOIN clues c ON c.word_id = w.id AND c.prompt_id = rp.prompt_id
            WHERE pw.puzzle_id = p.id
            ORDER BY pw.idx;
        """

        rows = run_query(query, params=(puzzle_id,), fetch=True)

        block = []
        clues = []

        for padded_word_text, clue_text, across, idx in rows:
            # Build Clue object
            clues.append({
                "text": clue_text,
                "across": across,
                "index": idx
            })

            # Build block array (same logic as Go)
            if across:
                for i, ch in enumerate(padded_word_text):
                    if ch == "*":
                        block.append(idx * size + i)

        result = {
            "id": puzzle_id,
            "size": size,
            "block": block,
            "clues": clues
        }

        return result, 200

    except Exception as e:
        return {"error": str(e)}, 500


def check_puzzle(puzzle_id, cert):
    """Check if puzzle solution is correct"""
    try:
        # SQL identical to Go
        query = """
            SELECT cert
            FROM puzzles
            WHERE id = %s;
        """

        row = run_query(query, params=(puzzle_id,), fetch=True)

        if not row:
            return {"error": "Puzzle not found"}, 404

        success = row[0][0] == cert

        result = {
            "id": puzzle_id,
            "success": success,
        }

        return result, 200

    except Exception as e:
        print("Exception:", e)
        return {"error": str(e)}, 500