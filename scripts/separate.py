import json
import os

with open('../testdata/words.json') as f:
    data = json.load(f)
    for word in data['words']:
        directory = '../testdata/'+str(len(word))
        if not os.path.exists(directory):
            os.makedirs(directory)
        firstLetter = word[0]
        fileName = directory+"/"+firstLetter
        writeVal = "a" if os.path.isfile(fileName) else "w"
        f = open(directory+"/"+firstLetter, writeVal)
        f.write(word+"\n")
        f.close()
