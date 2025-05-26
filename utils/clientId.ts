export function getOrCreateClientId(): string {
  let clientId = localStorage.getItem("clientId");

  if (!clientId) {
    clientId =
      self.crypto?.randomUUID?.() ?? Math.random().toString(36).substring(2);
    localStorage.setItem("clientId", clientId);
  }

  return clientId;
}
