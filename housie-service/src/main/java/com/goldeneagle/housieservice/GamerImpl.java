package com.goldeneagle.housieservice;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

public class GamerImpl implements Gamer {

    int length = 91;
    public List<Integer> list = new ArrayList<>();
    int current = 0;
    int previous = 0;

    private Random random = new Random();

    public GamerImpl() {
        System.out.println(".................GamerService Constructor called.................");
    }

    @Override
    public int getNext() {
        if (list.size() < (length - 1)) {
            int next = random.nextInt(length);
            while (list.contains(next) || next == 0) {
                next = random.nextInt(length);
            }
            list.add(next);
            previous = current;
            current = next;
            return next;
        }
        return -1;
    }

    @Override
    public List<Integer> getAll() {
        List<Integer> revList = new ArrayList<>(list);
        Collections.reverse(revList);
        return revList;
    }

    @Override
    public void reset() {
        list = new ArrayList<>();
        current = 0;
        previous = 0;
    }

    public int getLength() {
        return length;
    }

    public List<Integer> getList() {
        return list;
    }

    @Override
    public int getCurrent() {
        return current;
    }

    @Override
    public int getPrevious() {
        return previous;
    }

    public Random getRandom() {
        return random;
    }

}
