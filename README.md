# This is a simple multiplayer card game where:

- 5 players are dealt 5 cards from two 52 card decks, and the winner is the one with the highest score.
- The score for each player is calculated by adding the highest 3 card values for each player, where the number cards have their face value, J = 11, Q = 12, K = 13 and A = 11 (not 1).
-In the event of a tie, the scores are recalculated for only the tied players by calculating a "suit scor" for each player to see if the tie can be broken (it may not).
    * Each card is given a score bbased on its suit, with clubs = 1, diamonds = 2, hearts = 3 and spades = 4, and the player's score is the sum of all 5 suit values.

# This is a command line application using JavaScript (Node application);

# Input File Structure

- The input file contain 5 rows, one for each player's hand of 5 cards.
- Each row will contain the player's name separated by a colon then a comma separated list of the 5 cards.
- Each card will constist of the face value and the suit (H = Hearts, S = Spades, C = Clubs and D = Diamonds).
    * Examples: KD = King of Diamonds.
- Input is not case-sensitive.
- Spaces can be ignored.

# Example input:
Player1:JS,2S,6C,3C,2H
Player2:6D,8C,6D,AH,8H
Player3:5H,AC,4D,9S,10C
Player4:3C,8S,5D,JC,8D
Player5:KC,2C,QD,7H,4

# Below is the command line to run the program:
- node cards.js --in abc.txt --out xyz.txt

# Output File Structure

- Contains a single line, with one of the following 3 possibilities:
    * The name of the winner and their score (Face Value OR Face + Suit Value)(colon separated).
        - Example: Player1:35
    * A comma separated list of winners in the case of a tie and the score (Face Value OR Face + Suit Value) (colon separated).
        - Example: Player1,Player2:35
    * "Exception:[reason]" if the input file or its contents had any issue.
        - Example: Exception:Some reason why the input is wrong.