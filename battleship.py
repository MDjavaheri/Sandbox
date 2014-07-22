__author__ = 'u4678'
from random import randint
print("How many players are we today? One (1) or two (2)?")
players = int(input("Number of Players:"))
if players == 1:
    board = []
    restart = True
    while restart:
        print("So you want to play? How big of a board would you like? My screen size is the limit.")
        length = int(input("Board Length:"))
        width = int(input("Board Width:"))
        for x in range(length):
            board.append(["O"] * width)
        def print_board(board):
            for row in board:
                print(" ".join(row))
        print("\nLet's play Battleship!")
        print_board(board)
        def random_row(board):
            return randint(0, len(board) - 1)
        def random_col(board):
            return randint(0, len(board[0])-1)
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
            elif (guess_row > width) or (guess_col > length):
                print("Oops, that's not even in the ocean.")
            elif (guess_row < width) and (guess_col < length) and (board[guess_row][guess_col] == "X"):
                print("You guessed that one already.")
            elif (guess_row < width) and (guess_col < length) and (board[guess_row][guess_col] != "X"):
                board[guess_row][guess_col] = "X"
                print("You missed my battleship!")

            if turn == total_turns:
                #print("Game Over. My ship was at {0:s}, {1:s}".format(ship_row, ship_col))
                print("Game Over. My ship was at %s, %s" % (ship_row, ship_col))
                break
            else:
                print("\nTurn", turn + 1)
                print_board(board)
        replay = str(input("Would you like to play again?"))
        if replay.lower() == 'yes':
            #how do you restart?
            board = []
            print("Starting. Please wait.")
        else:
            print("Ok, have a good one.")
            break
else:
    board1 = []
    board2 = []
    restart = True
    while restart:
        print("So you want to play? How big of a board would you like per player? Your screen size is the limit.")
        length = int(input("Board Length:"))
        width = int(input("Board Width:"))
        for x in range(length):
            board1.append(["O"] * width)
            board2.append(["O"] * width)
        def print_boards(board):
            for row in board:
                print(" ".join(row))
        print("Let's play Battleship!")
        def random_row(board):
            return randint(0, len(board) - 1)
        def random_col(board):
            return randint(0, len(board[0])-1)
        ship_row1 = random_row(board1)
        ship_col1 = random_col(board1)
        ship_row2 = random_row(board2)
        ship_col2 = random_col(board2)
        # Everything from here on should go in your for loop!
        # Be sure to indent four spaces!
        total_turns = int(input("How many turns do you think you'll need?"))
        turn = 1
        print("")
        for i in range(total_turns):
            print("Turn", turn)
            print("")
            print("Player 1, it's your turn!")
            print_boards(board1)
            guess_row1 = int(input("Guess Row:"))-1
            guess_col1 = int(input("Guess Col:"))-1
            if guess_row1 == ship_row1 and guess_col1 == ship_col1:
                print("Congratulations! You sunk Player 2's battleship! Player 1 wins!")
                board1[guess_row1][guess_col1] = "I"
                print_boards(board1)
                break
            elif (guess_row1 > width) or (guess_col1 > length):
                print("Oops, that's not even in the ocean.")
            elif (guess_row1 < width) and (guess_col1 < length) and (board1[guess_row1][guess_col1] == "X"):
                print("You guessed that one already.")
            elif (guess_row1 < width) and (guess_col1 < length) and (board1[guess_row1][guess_col1] != "X"):
                board1[guess_row1][guess_col1] = "X"
                print("You missed his battleship!")
            else:
                print("You missed his battleship!")

            print("")
            print("Player 2, it's your turn!")

            print_boards(board2)
            guess_row2 = int(input("Guess Row:"))-1
            guess_col2 = int(input("Guess Col:"))-1
            if guess_row2 == ship_row2 and guess_col2 == ship_col2:
                print("Congratulations! You sunk Player 1's battleship! Player 2 wins!")
                board2[guess_row2][guess_col2] = "I"
                print_boards(board2)
                break
            elif (guess_row2 > width) or (guess_col2 > length):
                print("Oops, that's not even in the ocean.")
            elif (guess_row2 < width) and (guess_col2 < length) and (board2[guess_row2][guess_col2] == "X"):
                print("You guessed that one already.")
            elif (guess_row2 < width) and (guess_col2 < length) and (board2[guess_row2][guess_col2] != "X"):
                board2[guess_row2][guess_col2] = "X"
                print("You missed his battleship!")
            else:
                print("You missed his battleship!")

            if turn == total_turns:
                #print("Game Over. My ship was at {0:s}, {1:s}".format(ship_row, ship_col))
                print("No turns left. Game Over.\nNow... the battleship coordinates were:")
                print("Player 1: %s, %s." % (ship_row1, ship_col1))
                print("Player 2: %s, %s." % (ship_row2, ship_col2))

                break
            else:
                turn += 1


        replay = str(input("Would you like to play again?"))
        if replay.lower() == 'yes':
            board1 = []
            board2 = []

            print("Starting. Please wait.")
        else:
            print("Ok, have a good one.")
            break
