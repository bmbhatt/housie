package com.goldeneagle.housieservice.cowin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.TimeUnit;

@Component
public class CowinRunner {

    @Autowired
    CoWinService coWinService;

    @PostConstruct
    public void initRunner() {
        ThreadFactory threadFactory = new ThreadFactory() {
            @Override
            public Thread newThread(Runnable runnable) {
                Thread t = new Thread(runnable);
                t.setName("cowin-searcher");
                t.setDaemon(true);
                return t;
            }
        };
        ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(1, threadFactory);
        scheduledExecutorService.scheduleWithFixedDelay(() -> coWinService.calendarByDistrictIds(Constant.DEFAULT_DISTRICT,
                Constant.CURRENT_DATE_STR), 0, 4, TimeUnit.SECONDS);
    }
}
