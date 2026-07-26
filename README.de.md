# Mechanical Counter Card – deutsche Kurzanleitung

Fotorealistisches mechanisches Zählwerk für Home Assistant mit dem schwarzen Gehäuse und den schwarzen Kreuzschrauben der analogen Gauge.

![Vorschau](images/dashboard-preview.png)

## HACS-Installation

1. In HACS das Drei-Punkte-Menü öffnen.
2. **Benutzerdefinierte Repositories** auswählen.
3. `https://github.com/loungelizard2018/mechanical-counter-card` eintragen.
4. Kategorie **Dashboard** auswählen.
5. Karte installieren und das Frontend neu laden.

## Automatische Größenanpassung

```yaml
fit_to_card: true
allow_upscale: false
```

Das vollständige Element wird proportional auf die tatsächlich verfügbare Spaltenbreite verkleinert. Gehäuse, Schrauben, Anzeige, Beschriftung und Schatten bleiben dabei zusammen. Die Kartenhöhe wird ebenfalls korrigiert, sodass nichts in eine Nachbarspalte hineinragt.

## Beispiel

```yaml
type: custom:mechanical-counter-card
fit_to_card: true
allow_upscale: false
transparent_card: true
frame: gauge_black
screws: true
screw_size: 28
integer_color: "#f3f3ed"
decimal_color: "#d52b2b"
meta_color: "#dedede"
animation: true
animation_duration: 720
animation_stagger: 45

registers:
  - entity: sensor.stromzaehler_ht
    label: HT
    unit: kWh
    integer_digits: 6
    decimals: 1

  - entity: sensor.stromzaehler_nt
    label: NT
    unit: kWh
    integer_digits: 7
    decimals: 0
```
