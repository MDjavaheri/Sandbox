import java.util.ArrayList;
import java.util.HashMap;
import java.util.Stack;

/** 
 * Converts expressions. 
 * Currently supports: infix to postfix
 */

/**
 * @author MDjavaheri
 * @version 2
 */
public final class Converter {
	protected static HashMap<String, Integer> stackPriorities = new HashMap<String, Integer>();
	protected static HashMap<String, Integer> inputPriorities = new HashMap<String, Integer>();

	/**
	 * Converts an infix expression to postfix
	 * @param expression an infix expression
	 * @return expression in postfix form
	 */
	
	public static ArrayList<String> infixToPostfix2(String expression) {		
		loadStacks();
		Stack<String> operators = new Stack<String>();
		ArrayList<String> postfix = new ArrayList<String>();
		String[] infix = expression.split("((?<=[+/*%\\(\\)])|(?=[+/*%\\(\\)])|(?=(--))|(?=(-[\\d\\(]))|(?<=[\\d\\)]-))");
		for (int i = 0; i < infix.length; i++){//convert
			String current = infix[i];
			if (infix[i].equals("")) {
				i++;
				current = infix[i];
			}
			if (current.matches("(-)?\\d+")) {
				postfix.add(current);
			}
			else if (operators.isEmpty()) {
				operators.push(current);
			}
			else if (current.matches("[)]")) {
				while (!operators.peek().matches("[(]")) {
					postfix.add(operators.pop());
				}
				operators.pop(); //gets the last "(" out
			}
			else if(stackPriorities.get(operators.peek()) < inputPriorities.get(current)) {
				//infix += operators.pop();
				operators.push(current);
			}
			else if(stackPriorities.get(operators.peek()) > inputPriorities.get(current)) {
				postfix.add(operators.pop());
				operators.push(current);
			}
			else {
				postfix.add(current);
			}
		}
		while (!operators.isEmpty()) {
			postfix.add(operators.pop());
		}
		return postfix;
	}
	/**
	 * Puts operators and priorities into the appropriate hashmaps
	 */
	private static void loadStacks(){
		stackPriorities.put("+", 11);
		stackPriorities.put("-", 11);
		stackPriorities.put("*", 21);
		stackPriorities.put("/", 21);
		stackPriorities.put("%", 21);
		stackPriorities.put("(", 0);
		inputPriorities.put("+", 10);
		inputPriorities.put("-", 10);
		inputPriorities.put("*", 20);
		inputPriorities.put("/", 20);
		inputPriorities.put("%", 20);
		inputPriorities.put("(", 100);
	}
}
