package com.goldeneagle.housieservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/housie")
public class HousieController {

    @Autowired
    Games games;

    @CrossOrigin(origins = {Constants.LOCAL_SERVER, Constants.GCP_SERVER, Constants.AZURE_SERVER})
    @RequestMapping(value = "/{id}/previous", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Integer getPrevious(@PathVariable("id") Integer id) {
        return games.getPrevious(id);
    }

    @CrossOrigin(origins = {Constants.LOCAL_SERVER, Constants.GCP_SERVER, Constants.AZURE_SERVER})
    @RequestMapping(value = "/{id}/current", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Integer getCurrent(@PathVariable("id") Integer id) {
        return games.getCurrent(id);
    }

    @CrossOrigin(origins = {Constants.LOCAL_SERVER, Constants.GCP_SERVER, Constants.AZURE_SERVER})
    @RequestMapping(value = "/{id}/ifBoardReset", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Boolean getIfBoardIsReset(@PathVariable("id") Integer id) {
        return games.getIfBoardIsReset(id);
    }

    @CrossOrigin(origins = {Constants.LOCAL_SERVER, Constants.GCP_SERVER, Constants.AZURE_SERVER})
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Integer getNext(@PathVariable("id") Integer id) {
        return games.getNext(id);
    }

    @CrossOrigin(origins = {Constants.LOCAL_SERVER, Constants.GCP_SERVER, Constants.AZURE_SERVER})
    @RequestMapping(value = "/{id}/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Integer> getAll(@PathVariable("id") Integer id) {
        return games.getAll(id);
    }

    @CrossOrigin(origins = {Constants.LOCAL_SERVER, Constants.GCP_SERVER, Constants.AZURE_SERVER})
    @RequestMapping(value = "/{id}/reset", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public void reset(@PathVariable("id") Integer id, HttpServletRequest request) {
        if (request != null) {
            System.out.println("Reset performed by IP Address : " + request.getRemoteAddr());
        }
        games.reset(id);
    }

    @CrossOrigin(origins = {Constants.LOCAL_SERVER, Constants.GCP_SERVER, Constants.AZURE_SERVER})
    @RequestMapping(value = "/ticket", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Integer> ticket() {
        return games.myTicket();
    }

    @CrossOrigin(origins = {Constants.LOCAL_SERVER, Constants.GCP_SERVER, Constants.AZURE_SERVER})
    @RequestMapping(value = "/newgame", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Integer newGame() {
        return games.newGame();
    }

    @CrossOrigin(origins = {Constants.LOCAL_SERVER, Constants.GCP_SERVER, Constants.AZURE_SERVER})
    @RequestMapping(value = "/{id}/finishgame", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public void finishGame(@PathVariable("id") Integer id) {
        games.finishGame(id);
    }

    @CrossOrigin(origins = {Constants.LOCAL_SERVER, Constants.GCP_SERVER, Constants.AZURE_SERVER})
    @RequestMapping(value = "/getallgames", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Integer> getAllGames() {
        return games.getAllGames();
    }
}
