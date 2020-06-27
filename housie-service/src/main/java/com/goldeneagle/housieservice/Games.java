package com.goldeneagle.housieservice;

import org.springframework.web.bind.annotation.PathVariable;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

public class Games {
    Map<Integer, GamerImpl> gamesM = new HashMap<>();
    List<Ticket> tickets = new ArrayList<>();;
    AtomicInteger aCount = new AtomicInteger(1);

    public Games() {
    }

    public Games(Integer gameId) {
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

    public boolean getIfBoardIsReset(Integer gameId) {
        return gamesM.get(gameId).getIfBoardIsReset();
    }

    public void reset(Integer gameId) {
        gamesM.get(gameId).reset();
    }

    public Ticket myTicket() {
        int[] ticket = generateTickets();
        int[] finalTickets = checkAndFix(ticket);
        List<Integer> output = Arrays.stream(finalTickets).boxed().collect(Collectors.toList());
        Ticket t = new Ticket(aCount.getAndIncrement(), output);
        tickets.add(t);
        return t;
    }

    private int[] generateTickets() {
        int[] ticket = new int[27];
        int cSingle = 0;
        int cDouble = 0;
        int cTriple = 0;
        for (int i = 0; i < 9; i++) {
            int count = 2;
            boolean one = (ThreadLocalRandom.current().nextInt(1, 3) % 2 != 0 && cSingle < 3) || cDouble > 5;
            if (one) {
                count = 1;
                cSingle++;
            } else {
                boolean three = ThreadLocalRandom.current().nextInt(1, 200) < 10 && cTriple < 1 && cDouble < 4;
                if (three) {
                    count = 3;
                    cTriple++;
                    cSingle--;
                    cDouble++;
                }
                else
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
                continue;
            }
            int columnCount = 0;
            for (int i = 0; i < 9; i++) {
                columnCount = 0;
                if (newTickets[i] > 0)
                    columnCount++;
                if (newTickets[i+9] > 0)
                    columnCount++;
                if (newTickets[i+18] > 0)
                    columnCount++;
                if (columnCount == 0) {
                    regen = true;
                    newTickets = generateTickets();
                }
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
        int previousIndex = -1;
        int previous = -1;
        int current = -2;
        int currentIndex = -2;
        while (count > 0) {
            while (current <= previous) {
                current = ThreadLocalRandom.current().nextInt(i * 10, i * 10 + (10 - count + 1));
            }
            while (currentIndex <= previousIndex) {
                currentIndex = ThreadLocalRandom.current().nextInt(i * 3, i * 3 + (3 - count + 1));
            }
            ticket[currentIndex] = current;
//            System.out.println("i ="+i+ ", count = "+count+"Populating number at index " + currentIndex + ", number = " + current);
            previous = current;
            previousIndex = currentIndex;
            count--;
        }
    }

    public Integer newGame() {
        Integer gameId = 1;
        while (gamesM.get(gameId) != null) {
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

    public void cheat(Integer id, Integer ticketno) {
        gamesM.get(id).setCheatTicketNo(ticketno);
    }

    public Integer getCheat(Integer id) {
        return gamesM.get(id).getCheatTicketNo();
    }
}
