# Droplet Interview

# Prereqs for running:

     node installed
     repo downloaded and unzipped

# Steps to run:

    - open terminal/cmd
    - navigate to extracted zip folder
    - run command: `npm install`
    - run example with: `npx ts-node spellcheck.ts dictionary.txt text.txt`
    - run tests with : `npx jest`

I decided to tackle the spellchecker! I'll briefly describe my thought process behind
each feature as well as any caveats or issues I ran into.

One issue to note is that I parsed the input file in a way that works for most standard cases,
but in edge cases where extra spaces or new lines are added it can mess up the words. I prioritized
getting features working for more typical input. Given more time, edge cases can be addressed.

# List of misspelled words

To determine if a word is spelled incorrectly I took the provided dictionary and made it a map with key value pairs of: word : true.
Next I search through the text file to see if any of the words are NOT in the dictionary. If not in the dictionary, the word is
added to a list of misspelled words. This list is returned and printed for the user.

# Caveats for misspelled words

One issue identified is that a map is probably not the best data structure to use for this. Only the key is used, never the value. So a set
would probably be better. However, I was a bit late in the process when I realized this and decided to develop more features instead of refactoring
data structures that would change a lot of things.


The larger issue is space and time. The dictionary is very large. If the text file is also very large it could cause slow run times. Worst case scenario,
time complexity is O N^2.  Given more time, a more optimal solution could be found.

# Suggestions

After some googling, I found several algorithms for string comparisons and differences. I decided to go with Damerau-Levenshtein because it was easy to implement, it had values I deemed necessary for solving the problem, and it includes swapping characters which its counterpart, Levenshtein, does not.

For each misspelled word, it is compared to each word in the dictionary. If the word's Damerau-Levenshtein value is less than 3 and the words are over 60% similar the word is added to the list of suggested words.

# Caveats suggestions

Time and space are concerns here again. Each word is compared to every dictionary word and the Damerau-Levenshtein value is computed. Given more time, there's likely a way to narrow suggestions to prevent comparing a misspelled word to the entire dictionary.

# Line and Column

I split the text file into an array of arrays where each item in the array is a row and each item in a row is a column. Then I took the misspelled word and searched for it in the rows and r eturned values of its row and column. I changed the name of column to word to make it a bit more clear to

# Surrounding Context

I decided that about two words on either side of the misspelled word would be enough context for a user to search the document for the error. After a misspelled word is found in the text, two words are taken from either side, given that there are words in those positions, and are added to a string that's returned to the user.

# Proper Nouns

This one was very interesting! My first approach was to make all words from the input text lowercase. This would prevent mismatches due to case or capitalization because of a proper noun. However, this doesn't REALLY solve the problem. I used my name in my example text and it's flagged as a misspelled word.

I could use a second dictionary of proper nouns and compare misspelled words to those to see if there's a match, but that would be a huge undertaking.

Googling led me to discover that this is a natural language search problem. I wasn't satisfied with any of the results so I decided my implementation was good enough for now.

# Unit Tests

I wrote up some unit tests to test the functions that read files. Given more time, I would expand the suite to cover all functions.
