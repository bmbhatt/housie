package com.goldeneagle.housieservice.websocket;

import com.goldeneagle.housieservice.Games;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class HousieWebSocketController {

    @Autowired
    Games games;

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/{id}/next")
//    @SendTo("/topic/{id}/newNumber")
    public void getNext(@DestinationVariable String id) {
        System.out.println("getNext .... called for id = " + id);
        String dest = "/topic/" + id + "/newNumber";
        simpMessagingTemplate.convertAndSend(dest, games.getNext(Integer.parseInt(id)));
//        return games.getNext(Integer.parseInt(id));
    }

    @MessageMapping("/{id}/getwscheat/{ticketno}")
//    @SendTo("/topic/{id}/newNumber")
    public void getCheatTicketNo(@DestinationVariable Integer id, @DestinationVariable Integer ticketno) {
        System.out.println("cheat .... called for id = " + id + ", ticket no=" + ticketno);
        String dest = "/topic/" + id + "/cheatTicketNo";
        simpMessagingTemplate.convertAndSend(dest, games.getCheat(id));
    }

}
