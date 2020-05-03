package com.goldeneagle.housieservice;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

public class Generator {

    int length = 91;
    public List<Integer> list = new ArrayList<>();
    int current = 0;
    int previous = 0;

    private Random random = new Random();

    public Generator() {
        System.out.println(".................Generator Constructor called.................");
    }

    public int getNext() {
        if(list.size() < (length - 1)) {
            int next = random.nextInt(length);
            while(list.contains(next) || next == 0) {
                next = random.nextInt(length);
            }
            list.add(next);
            previous = current;
            current = next;
            return next;
        }
        return -1;
    }

    public List<Integer> getAll() {
        List<Integer> revList = new ArrayList<>(list);
        Collections.reverse(revList);
        return revList;
    }

    public void reset() {
        list = new ArrayList<>();
        current = 0;
        previous = 0;
    }

    public List<Integer> myTicket() {
        int[] ticket = generateTickets();
        int[] finalTickets = checkAndFix(ticket);
        return Arrays.stream(finalTickets).boxed().collect(Collectors.toList());
    }

    private int[] checkAndFix(int[] ticket) {
        int[] newTickets = ticket.clone();
        boolean regen = true;

        while(regen) {
            regen = false;
            int count1 = 0;
            int count2 = 0;
            int count3 = 0;
            for (int i = 0; i < newTickets.length; i++) {
                if (i < 9 && newTickets[i] > 0)
                    count1++;
                if (i >= 9 && i < 18 && newTickets[i] > 0)
                    count2++;
                if (i >= 18 && newTickets[i] > 0)
                    count3++;
            }
            if (count1 < 5 || count2 < 5 || count3 < 5) {
                regen = true;
                newTickets = generateTickets();
            }
        }

        return  newTickets;
    }

    private int[] generateTickets() {
        int[] ticket = new int[27];
        int cSingle = 0;
        int cDouble = 0;
        for (int i = 0; i < 9; i++) {
            int count = 2;
            boolean one = (ThreadLocalRandom.current().nextInt(1, 3) % 2 != 0 && cSingle < 3) || cDouble > 5;
            if(one) {
                count = 1;
                cSingle++;
            } else {
                cDouble++;
            }
            generateAndPopulate(ticket, i, count);
        }
        return arrange(ticket);
    }

    private int[] arrange(int[] ticket) {
        int[] newArray = new int[27];
        int ci = 0;
        int j = ci;
        for (int i = 0; i < ticket.length; i++) {
            newArray[j] = ticket[i];
            j = j+9;
            if(j >= 27) {
                ci++;
                j = ci;
            }
        }

        return newArray;
    }

    private void generateAndPopulate(int[] ticket, int i, int count) {
        int previousIndex = 0;
        int previous = 0;
        int current = -1;
        int currentIndex = -1;
        while(count > 0) {
            while(current <= previous) {
                current = ThreadLocalRandom.current().nextInt(i * 10, i * 10 + (10 - count + 1));
            }
            while(currentIndex <= previousIndex) {
                currentIndex = ThreadLocalRandom.current().nextInt(i * 3, i * 3 + (3 - count + 1));
            }
            ticket[currentIndex] = current;
            previous = current;
            previousIndex = currentIndex;
            count--;
        }
    }


    public int getLength() {
        return length;
    }

    public List<Integer> getList() {
        return list;
    }

    public int getCurrent() {
        return current;
    }

    public int getPrevious() {
        return previous;
    }

    public Random getRandom() {
        return random;
    }

}
