__author__ = 'u4678'
from random import randint
board = []
print("So you want to play? How big of a board would you like? My screen size is the limit.")
length = int(input("Board Length:"))
width = int(input("Board Width:"))
for x in range(length):
    board.append(["O"] * width)
def print_board(board):
    for row in board:
        print(" ".join(row))
print("Let's play Battleship!")
print_board(board)
def random_row(board):
    return randint(0, len(board) - 1)
def random_col(board):
    return randint(0, len(board[0]) - 1)
ship_row = random_row(board)
ship_col = random_col(board)
# Everything from here on should go in your for loop!
# Be sure to indent four spaces!
total_turns = int(input("How many turns do you think you'll need?"))
turn = 0
for i in range(total_turns):
    turn += 1
    guess_row = int(input("Guess Row:"))-1
    guess_col = int(input("Guess Col:"))-1
    if guess_row == ship_row and guess_col == ship_col:
        print("Congratulations! You sunk my battleship!")
        break
    elif (guess_row < 0 or guess_row > width) or (guess_col < 0 or guess_col > length):
        print("Oops, that's not even in the ocean.")
    elif board[guess_row][guess_col] == "X":
        print("You guessed that one already.")
    else:
        print("You missed my battleship!")
        board[guess_row][guess_col] = "X"
    if turn == total_turns:
        #print("Game Over. My ship was at {0:s}, {1:s}".format(ship_row, ship_col))
        print("Game Over. My ship was at %s, %s" % (ship_row, ship_col))
        break
    else:
        print("Turn", turn + 1)
        print_board(board)
replay = str(input("Would you like to play again?"))
#if replay.lower == "yes":
