package com.goldeneagle.housieservice.cowin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cowin")
public class CoWinController {

    @Autowired
    CoWinService service;

    @CrossOrigin
    @RequestMapping(value = "/searchByDistrict/{district_id}", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Integer searchByDistrict(@PathVariable("district_id") Integer id) {
        return service.searchByDistrictId();
    }

}
