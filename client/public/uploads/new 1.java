public class NestedForLoopsExample {
    public static void main(String[] args) {
        int rows = 5; // You can change the number of rows as needed

        // Outer loop for the number of rows
        for (int i = 1; i <= rows; i++) {

            // Inner loop for spaces before the asterisks
            for (int j = 1; j <= rows - i; j++) {
                System.out.print(" ");
            }

            // Inner loop for printing asterisks
            for (int k = 1; k <= 2 * i - 1; k++) {
                System.out.print("*");
            }

            // Move to the next line after each row is printed
            System.out.println();
        }
    }
}
