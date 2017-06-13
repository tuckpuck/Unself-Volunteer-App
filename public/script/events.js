  function Event(
    event_name,
    description,
    cause,
    start_date,
    end_date,
    start_time,
    end_time,
    street_address,
    city,
    zip,
    photo_url,
    event_url,
    organization_id) {
    console.log('in constructor');
    this.name = event_name;
    this.event_description = description;
    this.cause = cause;
    this.start_date = start_date;
    this.end_date = end_date;
    this.start_time = start_time;
    this.end_time = end_time;
    this.street_address = street_address;
    this.city = city;
    this.zip_code = zip;
    this.photo_url = photo_url;
    this.event_url = event_url;
    this.organization_id = organization_id;
  }
