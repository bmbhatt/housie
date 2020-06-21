package com.goldeneagle.housieservice;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class HousieServiceApplicationTests {

	@LocalServerPort
	private int port;

	@Autowired
	HousieController controller;

	@Autowired
	TestRestTemplate restTemplate;

	@Test
	void contextLoads() {
		assertThat(controller).isNotNull();
	}

	@Test
	public void testGetNext() {
		assertThat(this.restTemplate.getForObject("http://localhost:" + port + "/housie/1", Integer.class)).isBetween(1, 90);
	}

	@Test
	public void testUniqueness() {
		Map<Integer, Integer> all = new HashMap<>();

		for(int i = 1; i < 91; i++) {
			Integer nextInt = this.restTemplate.getForObject("http://localhost:" + port + "/housie/1", Integer.class);
			assertThat(all.get(nextInt)).isNull();
			all.put(nextInt, 1);
		}

	}

	@Test
	public void testTicket() {
		Ticket ticket = this.restTemplate.getForObject("http://localhost:" + port + "/housie/ticket", Ticket.class);
		assertThat(ticket.getTickets().size()).isEqualTo(27);
		int count = 0;
		for (Integer no : ticket.getTickets()) {
			if (no != 0) count++;
		}
		assertThat(count).isEqualTo(15);
	}

}