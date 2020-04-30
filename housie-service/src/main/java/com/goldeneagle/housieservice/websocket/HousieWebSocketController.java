package com.goldeneagle.housieservice.websocket;

import com.goldeneagle.housieservice.Generator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class HousieWebSocketController {

    @Autowired
    Generator generator;

    @MessageMapping("/next")
    @SendTo("/topic/newNumber")
    public Integer getNext() {
        return generator.getNext();
    }
}
