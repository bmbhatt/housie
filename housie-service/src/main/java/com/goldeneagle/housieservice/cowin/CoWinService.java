package com.goldeneagle.housieservice.cowin;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CoWinService {

    @Autowired
    RestTemplate restTemplate;

    public List<String> searchByDistrictId(String districtId, String dt) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "*/*");
        headers.set("user-agent", "bb");
        headers.set("cache-control", "none");

        HttpEntity<String> entity = new HttpEntity<>("body", headers);
        String response = restTemplate.exchange("https://cdn-api.co-vin.in/api/v2/appointment" +
                        "/sessions/public/findByDistrict?district_id=" + districtId + "&date=" + dt,
                HttpMethod.GET, entity, String.class).getBody();
        Appointments appointmentsObj = parseIndividualSearchResponse(response);
        List<String> st = appointmentsObj.getSessions().stream()
                .filter(session -> session.getAvailableCapacity() > 0 && session.getMinAgeLimit() == 18)
                .map(session -> StringUtils.join(
                        "Center Name: ",
                        session.getName(), "; Available Capacity: ",
                        session.getAvailableCapacity()))
                .collect(Collectors.toList());
        return st;
    }

    public List<Center> calendarByDistrictIds(String districtId, String dt) {
        String[] ids = districtId.split("-");
        if (ids.length == 0) {
            ids = new String[]{"603", "581"};
        }
        List<Center> res = new ArrayList<>();
        for (String districtCode : ids) {
            res.addAll(calendarByDistrictId(districtCode, dt));
        }
        if (!res.isEmpty()) {
            playSound();
            res.stream().forEach(center -> {
                System.out.println("Name: " + center.getName() + ", Pin Code: " + center.getPincode());
                center.getSessions().stream().forEach(session -> session.getAvailableCapacityDose1());
            });
        } else {
            System.out.println("NA");
        }
        return res;
    }

    public List<Center> calendarByDistrictId(String districtId, String dt) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "*/*");
        headers.set("user-agent", "bb");
        headers.set("cache-control", "none");

        HttpEntity<String> entity = new HttpEntity<>("body", headers);
        String response = restTemplate.exchange("https://cdn-api.co-vin.in/api/v2/appointment" +
                        "/sessions/public/calendarByDistrict?district_id=" + districtId + "&date=" + dt,
                HttpMethod.GET, entity, String.class).getBody();
        Calendar calendar = parseCalendarSearchResponse(response);
        calendar.getCenters().stream().forEach(center -> {
            center.setSessions(
                    center.getSessions().stream()
                            .filter(session -> session.getMinAgeLimit() == 18 &&
                                    session.getAvailableCapacityDose1() > 0)
                            .collect(Collectors.toList()));
        });
        return calendar.getCenters().stream()
                .filter(center -> !center.getSessions().isEmpty())
                .collect(Collectors.toList());
    }

    private Appointments parseIndividualSearchResponse(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(response, Appointments.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    private Calendar parseCalendarSearchResponse(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(response, Calendar.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    void playSound() {
        try {
            Clip clip = AudioSystem.getClip();
            InputStream in = getClass().getClassLoader().getResourceAsStream("./StarWars3.wav");
            AudioInputStream inputStream = AudioSystem.getAudioInputStream(
                    Objects.requireNonNull(in));
            clip.open(inputStream);
            clip.start();
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }


}
