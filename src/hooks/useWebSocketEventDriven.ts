import { useState } from "react";

const useWebSocketEventDriven = ()=>{
      const [isOnline, setIsOnline] = useState(true);
    
      
      return {isOnline};
}