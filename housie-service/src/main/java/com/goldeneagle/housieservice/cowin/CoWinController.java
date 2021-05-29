package com.goldeneagle.housieservice.cowin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cowin")
public class CoWinController {

    @Autowired
    CoWinService service;

    @CrossOrigin
    @RequestMapping(value = "/searchByDistrict/{district_id}/{dt}", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<String> searchByDistrict(@PathVariable("district_id") Integer id,
                                         @PathVariable("dt") String dt) {
        return service.searchByDistrictId(String.valueOf(id), dt);
    }

    @CrossOrigin
    @RequestMapping(value = "/calendarByDistrict/{district_ids}/{dt}", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Center> calendarByDistrict(@PathVariable("district_ids") String districtCodes,
                                         @PathVariable("dt") String dt) {
        return service.calendarByDistrictIds(districtCodes, dt);
    }
}
