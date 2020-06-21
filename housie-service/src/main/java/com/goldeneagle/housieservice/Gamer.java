package com.goldeneagle.housieservice;

import java.util.List;

public interface Gamer {
        public int getNext();

        public List<Integer> getAll();

        public void reset();

        int getCurrent();

        int getPrevious();

        boolean getIfBoardIsReset();
}
