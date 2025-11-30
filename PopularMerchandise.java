import java.io.*;
import java.util.*;

public class PopularMerchandise {
    public static void main(String[] args) {

        HashMap<String, Integer> countMap = new HashMap<>();

        try {
            BufferedReader br = new BufferedReader(new FileReader("items.csv"));
            String line;

            while ((line = br.readLine()) != null) {
                String[] items = line.split(",");

                for (String item : items) {
                    item = item.trim();
                    if (!item.isEmpty()) {
                        countMap.put(item, countMap.getOrDefault(item, 0) + 1);
                    }
                }
            }

            br.close();

        } catch (Exception e) {
            System.out.println("Error reading file: " + e.getMessage());
        }

        List<Map.Entry<String, Integer>> list = new ArrayList<>(countMap.entrySet());

        list.sort((a, b) -> b.getValue() - a.getValue()); 

        System.out.println("\nTop 3 Merchandise Items:");
        for (int i = 0; i < 3 && i < list.size(); i++) {
            System.out.println((i + 1) + ". " + list.get(i).getKey() +
                               " = " + list.get(i).getValue());
        }
    }
}
