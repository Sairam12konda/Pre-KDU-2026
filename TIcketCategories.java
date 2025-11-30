import java.util.*;

public class TicketCategories {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        ArrayList<String> ticketList = new ArrayList<>();
        HashSet<String> ticketSet = new HashSet<>();
        HashMap<String, Integer> ticketCount = new HashMap<>();

        System.out.println("Enter 10 ticket categories:");

        for (int i = 0; i < 10; i++) {
            String ticket = sc.nextLine();

            ticketList.add(ticket);
            ticketSet.add(ticket);

            ticketCount.put(ticket, ticketCount.getOrDefault(ticket, 0) + 1);
        }

        System.out.println("\nArrayList: " + ticketList);
        System.out.println("HashSet: " + ticketSet);
        System.out.println("HashMap: " + ticketCount);
    }
}
