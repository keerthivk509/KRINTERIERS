import { useState } from "react";
import { useServices } from "../hooks/useServices";
import { submitEnquiry } from "../api/cms";
import { content } from "../data/content";
import { Button, Reveal, SplitText } from "../components/Motion";

export default function Contact() {
  const { services } = useServices();
  const [f, setF] = useState({ name: "", phone: "", service: "", subunit: "" });
  const [status, setStatus] = useState("idle");
  const svc = services.find((s) => String(s.id) === f.service);
  const set = (k) => (e) =>
    setF({
      ...f,
      [k]: e.target.value,
      ...(k === "service" ? { subunit: "" } : {}),
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitEnquiry({
        name: f.name,
        phone: f.phone,
        serviceId: f.service,
        serviceTitle: svc?.title,
        subunitId: f.subunit,
      });
      setStatus("done");
      setF({ name: "", phone: "", service: "", subunit: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="container contact-grid">
        <div>
          <SplitText text={content.contact.title} className="h2" />
          <Reveal>
            <p className="lead">{content.contact.text}</p>
          </Reveal>
        </div>
        <Reveal>
          <form className="form" onSubmit={onSubmit}>
            <label>
              Name
              <input
                required
                value={f.name}
                onChange={set("name")}
                placeholder="Your name"
              />
            </label>
            <label>
              Number
              <input
                required
                value={f.phone}
                onChange={set("phone")}
                placeholder="Phone number"
                inputMode="tel"
              />
            </label>
            <label>
              Service
              <select required value={f.service} onChange={set("service")}>
                <option value="">Select…</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </label>
            {svc?.subunits.length > 0 && (
              <label>
                Type
                <select value={f.subunit} onChange={set("subunit")}>
                  <option value="">Any</option>
                  {svc.subunits.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.title}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <Button type="submit">
              {status === "sending" ? "Sending…" : "Submit"}
            </Button>
            <p className="form-msg" role="status">
              {status === "done" && "Thanks. We will get back to you shortly."}
              {status === "error" &&
                "Could not send. Check your connection and try again."}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
