package com.goldeneagle.housieservice;

import java.util.List;

public class Ticket {
    private int ticketId;

    private List<Integer> tickets;

    public Ticket() {
    }

    public Ticket(int ticketId, List<Integer> tickets) {
        this.ticketId = ticketId;
        this.tickets = tickets;
    }

    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    public List<Integer> getTickets() {
        return tickets;
    }

    public void setTickets(List<Integer> tickets) {
        this.tickets = tickets;
    }
}
