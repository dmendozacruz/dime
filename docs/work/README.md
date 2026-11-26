# Notas de trabajo

Una nota por componente (y una por Foundations). Cada una es el registro de *por qué* el
componente es como es: de dónde salió, qué se decidió, qué se descartó y qué se comprobó.
No es documentación de uso: eso vive en Storybook y en Figma.

## Cómo se lee una nota

Todas empiezan por **Resumen y estado** (fases hechas y qué queda abierto). Debajo, el
historial en orden: fuentes, matriz de comparación, decisiones y alternativas, y las
secciones por fecha (limpieza en Figma, documentación, Storybook). Los motivos se
conservan; lo que cambió de rumbo queda en la sección fechada donde se decidió.

## Fases

1. **Investigar:** Figma, la web, APG y WCAG 2.2, y una matriz con las diferencias.
2. **Documentar en Figma:** anatomía, cuándo usarlo, recomendaciones, do y don't, accesibilidad y propiedades.
3. **Construir en Storybook:** código con tokens, cuatro páginas (Uso, Código, Accesibilidad, Ejemplos) y pruebas.
4. **Llevar a la web:** sustituir el código de la web por DIME. Pendiente para todos.

## Índice

| Nota | Fase 3 (Storybook) | Abierto |
| --- | --- | --- |
| [Accordion](accordion.md) | hecha | — |
| [Alert](alert.md) | hecha | — |
| [Back to top](back-to-top.md) | hecha | — |
| [Badge](badge.md) | hecha | — |
| [Blockquote](blockquote.md) | hecha | — |
| [Button](button.md) | hecha | — |
| [Card](card.md) | hecha | — |
| [Divider](divider.md) | hecha | — |
| [Input](input.md) | hecha | — |
| [Link](link.md) | hecha | — |
| [Nav Footer](nav-footer.md) | hecha | — |
| [Nav Header](nav-header.md) | hecha | — |
| [Process list](process-list.md) | hecha | — |
| [Skip nav](skip-nav.md) | hecha | — |
| [Tabs](tabs.md) | hecha | — |
| [Tooltip](tooltip.md) | hecha | — |
| [Historial de cambios](historial-de-cambios.md) | — | El registro detallado previo a la 0.1.0, con ids de Figma |
| [Foundations](foundation-sync.md) | hecha (colores, tipografía, espaciado, layout, iconos, logos) | Textos de uso de elevación y de algunos colores |

En todas, la verificación manual con VoiceOver y en dispositivo real sigue pendiente.

## Plantilla

```markdown
# [Componente]

## Resumen y estado
- Fase 1 a 4 y qué queda abierto.

## Fuentes
- Figma: nodo y fecha de lectura.
- Web: dónde se usa.
- APG / React Aria y WCAG 2.2: criterios que aplican.

## Matriz
| Aspecto | Figma | Web | APG / React Aria | Decisión |

## Decisiones y alternativas
Cada una con su motivo y si está cerrada o abierta.

## Historial
Secciones por fecha: Figma, documentación, Storybook.

## Validación
- Automática:
- Manual pendiente:
```
