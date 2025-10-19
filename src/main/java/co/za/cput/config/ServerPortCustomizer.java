package co.za.cput.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.ServerSocket;

/**
 * Ensures the embedded servlet container starts even when the configured port is already in use.
 * <p>
 * By default the application listens on port 8080. When that port is unavailable we transparently
 * switch to a random available port and log the change so that developers can quickly identify the
 * port the server actually bound to.
 */
@Component
public class ServerPortCustomizer implements WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {

    private static final Logger LOG = LoggerFactory.getLogger(ServerPortCustomizer.class);

    private final int configuredPort;

    public ServerPortCustomizer(@Value("${server.port:8080}") int configuredPort) {
        this.configuredPort = configuredPort;
    }

    @Override
    public void customize(ConfigurableServletWebServerFactory factory) {
        if (configuredPort == 0) {
            return; // Spring Boot will choose a random available port for us.
        }

        if (!isPortAvailable(configuredPort)) {
            int fallbackPort = findAvailablePort();
            factory.setPort(fallbackPort);
            LOG.warn("Configured port {} is already in use. Falling back to available port {}.", configuredPort, fallbackPort);
        }
    }

    private boolean isPortAvailable(int port) {
        try (ServerSocket socket = new ServerSocket()) {
            socket.setReuseAddress(false);
            socket.bind(new InetSocketAddress(InetAddress.getByName("0.0.0.0"), port), 1);
            return true;
        } catch (IOException ex) {
            return false;
        }
    }

    private int findAvailablePort() {
        try (ServerSocket socket = new ServerSocket(0)) {
            return socket.getLocalPort();
        } catch (IOException ex) {
            throw new IllegalStateException("Unable to locate an available TCP port", ex);
        }
    }
}