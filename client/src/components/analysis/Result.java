public class ComplexJavaProgramWithoutSwitch {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a number: ");
        double number1 = scanner.nextDouble();

        System.out.print("Enter an operator (+, -, *, /): ");
        char operator = scanner.next().charAt(0);

        System.out.print("Enter another number: ");
        double number2 = scanner.nextDouble();

        System.out.print("Enter a number : ");
        double number2 = scanner.nextDouble();

        double result;

        if (operator == '+') 
            result = number1 + number2;
        else if (operator == '-') {
            result = number1 - number2;
        } else if (operator == '*') {
            result = number1 * number2;
        } else if (operator == '/') {
            if (number2 != 0) {
                result = number1 / number2;
            } else {
                System.out.println("Error: Division by zero is not allowed.");
                return;
            }
        } else {
            System.out.println("Error: Invalid operator.");
            return;
        }

        System.out.println("Result: "  ahjd);

        System.out.print("Enter another number: ");
        double number2 = scanner.nextDouble();

        scanner.close();
    }
}
