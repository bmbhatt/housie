package com.goldeneagle.housieservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/housie")
public class HousieController {

    @Autowired
    Games games;

    @CrossOrigin
    @RequestMapping(value = "/{id}/previous", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Integer getPrevious(@PathVariable("id") Integer id) {
        return games.getPrevious(id);
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}/current", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Integer getCurrent(@PathVariable("id") Integer id) {
        return games.getCurrent(id);
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}/ifBoardReset", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Boolean getIfBoardIsReset(@PathVariable("id") Integer id) {
        return games.getIfBoardIsReset(id);
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Integer getNext(@PathVariable("id") Integer id) {
        return games.getNext(id);
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Integer> getAll(@PathVariable("id") Integer id) {
        return games.getAll(id);
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}/reset", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public void reset(@PathVariable("id") Integer id, HttpServletRequest request) {
        if (request != null) {
            System.out.println("Reset performed by IP Address : " + request.getRemoteAddr());
        }
        games.reset(id);
    }

    @CrossOrigin
    @RequestMapping(value = "/ticket", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Ticket ticket() {
        return games.myTicket();
    }

    @CrossOrigin
    @RequestMapping(value = "/newgame", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Integer newGame() {
        return games.newGame();
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}/finishgame", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public void finishGame(@PathVariable("id") Integer id) {
        games.finishGame(id);
    }

    @CrossOrigin
    @RequestMapping(value = "/getallgames", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Integer> getAllGames() {
        return games.getAllGames();
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}/cheat/{ticketno}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public void cheatTicketNo(@PathVariable("id") Integer id, @PathVariable("ticketno") Integer ticketno) {
        games.cheat(id, ticketno);
        String dest = "/topic/" + id + "/cheatTicketNo";
        simpMessagingTemplate.convertAndSend(dest, games.getCheat(id));
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}/getCheat", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Integer getCheatTicketNo(@PathVariable("id") Integer id) {
        return games.getCheat(id);
    }

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

}
