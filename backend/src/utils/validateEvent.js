const VALID_EVENT_TYPES = ["working", "idle", "absent", "product_count"];

const validateEvent = (event) => {
  const { timestamp, worker_id, workstation_id, event_type } = event;

  if (!timestamp || !worker_id || !workstation_id || !event_type) {
    return "Missing required fields";
  }

  if (!VALID_EVENT_TYPES.includes(event_type)) {
    return "Invalid event type";
  }

  //product_count must have count
  if (event_type === "product_count" && event.count == null) {
    return "product_count event must include count";
  }

  return null;
};

module.exports = validateEvent;
