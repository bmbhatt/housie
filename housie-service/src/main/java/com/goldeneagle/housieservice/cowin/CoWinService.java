package com.goldeneagle.housieservice.cowin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CoWinService {

    @Autowired
    RestTemplate restTemplate;

    public Integer searchByDistrictId() {
        try {
            String response = restTemplate.getForObject("https://cdn-api.co-vin.in/api/v2/appointment" +
                    "/sessions/public/findByDistrict?district_id=603&date=27-05-2021", String.class);
            System.out.println(response);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }
}
