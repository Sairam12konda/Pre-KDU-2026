import java.util.Scanner;

public class UsernameChecker {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter username: ");
        String username = sc.nextLine();

        System.out.print("Confirm username: ");
        String confirm = sc.nextLine();

        int len1 = username.length();
        int len2 = confirm.length();

        System.out.println("Length 1: " + len1);
        System.out.println("Length 2: " + len2);

        System.out.println("Lengths match: " + (len1 == len2));
        System.out.println("Strings match: " + username.equals(confirm));
    }
}
