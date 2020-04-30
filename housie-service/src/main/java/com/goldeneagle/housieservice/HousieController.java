package com.goldeneagle.housieservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/housie")
public class HousieController {

    public static final String localServer = "http://localhost:4200";
    public static final String remoteServer = "https://housie-app-c2e99.web.app";

    @Autowired
    Generator generator;

    @CrossOrigin(origins = {localServer, remoteServer})
    @RequestMapping(value = "/previous", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Integer getPrevious() {
        return generator.getPrevious();
    }

    @CrossOrigin(origins = {localServer, remoteServer})
    @RequestMapping(value = "/current", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Integer getCurrent() {
        return generator.getCurrent();
    }

    @CrossOrigin(origins = {localServer, remoteServer})
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Integer getNext() {
        return generator.getNext();
    }

    @CrossOrigin(origins = {localServer, remoteServer})
    @RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Integer> getAll() {
        return generator.getAll();
    }

    @CrossOrigin(origins = {localServer, remoteServer})
    @RequestMapping(value = "/reset", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public void reset(HttpServletRequest request) {
        if(request!=null) {
            System.out.println("Reset performed by IP Address : " + request.getRemoteAddr());
        }
        generator.reset();
    }

    @CrossOrigin(origins = {localServer, remoteServer})
    @RequestMapping(value = "/ticket", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Integer> ticket() {
        return generator.myTicket();
    }

}
