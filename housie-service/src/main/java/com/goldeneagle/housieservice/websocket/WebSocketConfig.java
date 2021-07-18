package com.goldeneagle.housieservice.websocket;

import com.goldeneagle.housieservice.Constants;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");
        registry.setApplicationDestinationPrefixes("/housie");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/housie/gs-guide-websocket")
                .setAllowedOrigins(Constants.LOCALHOST, Constants.LOCALHOST_4200, Constants.LOCALHOST_8080,
                        Constants.LOCALHOST_8081, Constants.GCP_SERVER, Constants.AZURE_SERVER)
                .withSockJS();
    }
}
