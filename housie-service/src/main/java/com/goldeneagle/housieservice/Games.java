package com.goldeneagle.housieservice;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

public class Games {
    Map<Integer, GamerImpl> gamesM;

    public Games() {
        gamesM = new HashMap<>();
    }

    public Games(Integer gameId) {
        gamesM = new HashMap<>();
        gamesM.put(gameId, new GamerImpl());
    }

    public int getNext(Integer gameId) {
        return gamesM.get(gameId).getNext();
    }

    public List<Integer> getAll(Integer gameId) {
        return gamesM.get(gameId).getAll();
    }

    public int getCurrent(Integer gameId) {
        return gamesM.get(gameId).getCurrent();
    }

    public int getPrevious(Integer gameId) {
        return gamesM.get(gameId).getPrevious();
    }

    public void reset(Integer gameId) {
        gamesM.get(gameId).reset();
    }

    public List<Integer> myTicket() {
        int[] ticket = generateTickets();
        int[] finalTickets = checkAndFix(ticket);
        return Arrays.stream(finalTickets).boxed().collect(Collectors.toList());
    }

    private int[] generateTickets() {
        int[] ticket = new int[27];
        int cSingle = 0;
        int cDouble = 0;
        for (int i = 0; i < 9; i++) {
            int count = 2;
            boolean one = (ThreadLocalRandom.current().nextInt(1, 3) % 2 != 0 && cSingle < 3) || cDouble > 5;
            if (one) {
                count = 1;
                cSingle++;
            } else {
                cDouble++;
            }
            generateAndPopulate(ticket, i, count);
        }
        return arrange(ticket);
    }

    private int[] checkAndFix(int[] ticket) {
        int[] newTickets = ticket.clone();
        boolean regen = true;

        while (regen) {
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

        return newTickets;
    }

    private int[] arrange(int[] ticket) {
        int[] newArray = new int[27];
        int ci = 0;
        int j = ci;
        for (int i = 0; i < ticket.length; i++) {
            newArray[j] = ticket[i];
            j = j + 9;
            if (j >= 27) {
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
        while (count > 0) {
            while (current <= previous) {
                current = ThreadLocalRandom.current().nextInt(i * 10, i * 10 + (10 - count + 1));
            }
            while (currentIndex <= previousIndex) {
                currentIndex = ThreadLocalRandom.current().nextInt(i * 3, i * 3 + (3 - count + 1));
            }
            ticket[currentIndex] = current;
            previous = current;
            previousIndex = currentIndex;
            count--;
        }
    }

    public Integer newGame() {
        Integer gameId = 1;
        while(gamesM.get(gameId) != null) {
            gameId++;
        }
        gamesM.put(gameId, new GamerImpl());
        return gameId;
    }

    public void finishGame(Integer gameId) {
        gamesM.remove(gameId);
    }

    public List<Integer> getAllGames() {
        return gamesM.keySet().stream().collect(Collectors.toList());
    }
}
