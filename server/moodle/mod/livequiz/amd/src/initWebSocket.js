
export const initWebSocket = (websocketUrl) => {

 const openConnectionButton = document.getElementById("openconnection");
    
      
    
openConnectionButton.addEventListener("click", function () {
    
 try {
    
 // Create a new WebSocket connection
    
 const socket = new WebSocket(websocketUrl);
    
      
    
 // Log connection status
    
 socket.onopen = () => {
    
 console.log("WebSocket connection established!");
    
 };
   
      
    
 // Handle incoming messages
    
 socket.onmessage = (event) => {
   
 console.log("Message received:", event.data);
    
 };
    
      
    
 // Handle errors
    
 socket.onerror = (error) => {
    
 console.error("WebSocket error:", error);
    
 };
    
      
    
 // Handle connection closure
    
socket.onclose = () => {
    
 console.log("WebSocket connection closed!");
    
 };
    
      
    
 } catch (error) {
    
 window.console.error("Error initializing WebSocket:", error);
    
 }
    
    });
    
    };