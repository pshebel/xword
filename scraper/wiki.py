from bs4 import BeautifulSoup
import requests;
import re

def GetDefinition(page, word):
  # print(content.get_text())
  for p in page.find_all('p'):
    # print(p.get_text())
    if word in p.get_text():
      # print(word)
      # remove occurrences of the word
      d = p.get_text().strip()
      d = re.sub('\n', "", d)
      d = re.sub('"', "\'", d)
      d = re.sub("(?i)"+word, "___", d)
      # remove all 
      d = re.sub(r'\(.*\)', "", d)
      d = re.sub(r'\[.*\]', "", d)
      return d
  return ""

# list of list that exist for the benefit of users
blacklist = [
  "",
]

url = "https://en.wikipedia.org"
wordDef = {}
linkWord = {}
linkWord["/wiki/War"] = "war"
words = ["war"]
links = ["/wiki/War"]
seen = []

while links and len(seen) < 50:
  newLink = links.pop(0)
  newWord = linkWord[newLink]
  page = requests.get(url+newLink)
  print(newWord, newLink)
  if page.status_code == 200:
    soup = BeautifulSoup(page.content, 'html.parser').find("div", "mw-parser-output")
    
    d = GetDefinition(soup, newWord)
    wordDef[newWord] = d
    seen.append(newWord)

    for a in soup.find_all('a'):
      word = a.get_text()
      link = a.get('href')
      if word == None or link == None:
        continue
      word = word.strip()
      link = link.strip()
      matchWord = re.match("^[a-zA-Z]{3}$", word)
      matchLink = re.match("^\/wiki\/[a-zA-Z\d\-\_]*$", link)
      if matchWord == None or matchLink == None:
        continue
      
      l = word.lower()
      if l not in words:
        words.append(l)
        links.append(link)
        linkWord[link] = l

f = open("test.txt", "a")
f.write("INSERT INTO xword.words (word, word_len, definition, submitter) VALUES ")
values = []
for key in wordDef:
  if wordDef[key] != "":
    value = [key, str(len(key)), wordDef[key], 'wiki']
    values.append("(\""+"\",\"".join(value)+"\")")
f.write(",".join(values)+";")
f.close()


