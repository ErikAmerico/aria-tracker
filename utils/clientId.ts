export function getOrCreateClientId(): string {
  let clientId = localStorage.getItem("clientId");
  console.log("clientID from stoargee", clientId);

  if (!clientId) {
    clientId =
      self.crypto?.randomUUID?.() ?? Math.random().toString(36).substring(2);
    localStorage.setItem("clientId", clientId);
    console.log("client ID new", clientId);
  }

  console.log("returning this client ID", clientId);
  return clientId;
}
