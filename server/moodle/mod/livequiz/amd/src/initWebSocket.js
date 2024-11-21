
    document.addEventListener("DOMContentLoaded", console.log("The script is run"));
    define([], function() {
      return {
          initWebSocket: function(url) {
            document.addEventListener("DOMContentLoaded", console.log("The script is run"));
              const openConnectionButton = document.getElementById("openconnection");
  
              openConnectionButton.addEventListener("click", function() {
                  try {
                     document.addEventListener("DOMContentLoaded", console.log("The script is run"));
                      // Create a new WebSocket connection
                      const socket = new WebSocket(url);
  
                      // Event handlers for various WebSocket events
                      socket.onopen = () => {
                          console.log("WebSocket connection established!");
                      };
  
                      socket.onmessage = (event) => {
                          console.log("Message received:", event.data);
                      };
  
                      socket.onerror = (error) => {
                          console.error("WebSocket error:", error);
                      };
  
                      socket.onclose = () => {
                          console.log("WebSocket connection closed!");
                      };
  
                  } catch (error) {
                      console.error("Error initializing WebSocket:", error);
                  }
              });
          }
      };
  });
  