import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  email?: string
  company?: string
  role?: string
  phone?: string
  formats?: string
  message?: string
}

function MidiaKitInquiryEmail(data: Props) {
  const fields = [
    ['Nome do Solicitante', data.name],
    ['Empresa / Marca', data.company],
    ['E-mail Corporativo', data.email],
    ['Cargo / Função', data.role],
    ['WhatsApp / Telefone', data.phone],
    ['Formatos / Cota de Interesse', data.formats],
    ['Mensagem / Objetivos', data.message],
  ]
  return (
    <Html lang="pt-BR" dir="ltr">
      <Head />
      <Preview>Nova solicitação de patrocínio recebida pelo Mídia Kit Buzzini Sports.</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={brand}>BUZZINI SPORTS — MÍDIA KIT 2026</Text>
          <Heading style={heading}>Nova Proposta de Parceria Comercial</Heading>
          {fields.map(([label, value]) => (
            <Text key={label} style={field}>
              <strong>{label}:</strong> {value || 'Não informado'}
            </Text>
          ))}
          <Text style={footerNote}>
            Solicitação originada no Mídia Kit Web Oficial (buzzinisports.lovable.app/midia-kit).
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: MidiaKitInquiryEmail,
  subject: (data) =>
    `Mídia Kit | Patrocínio: ${typeof data['company'] === 'string' && data['company'] ? data['company'] : 'Nova Marca'}`,
  displayName: 'Solicitação de Patrocínio — Mídia Kit',
  to: 'assessoria@buzzini.com.br',
  previewData: {
    name: 'Carlos Mendes',
    email: 'carlos@empresa.com.br',
    company: 'NutriSport Brasil',
    role: 'Gerente de Marketing',
    phone: '(17) 99999-9999',
    formats: 'Tenda Oficial, Collabs Instagram, Sampling',
    message: 'Gostaríamos de receber uma proposta para a temporada 2026.',
  },
} satisfies TemplateEntry

const body = { backgroundColor: '#ffffff', color: '#1e293b', fontFamily: 'Arial, sans-serif' }
const container = { maxWidth: '600px', padding: '32px 24px' }
const brand = { color: '#FF5500', fontWeight: '700', fontSize: '12px', letterSpacing: '1px' }
const heading = { fontSize: '22px', lineHeight: '28px', color: '#0f172a', marginTop: '8px' }
const field = { fontSize: '14px', lineHeight: '22px', color: '#334155', whiteSpace: 'pre-wrap' as const }
const footerNote = { fontSize: '12px', color: '#64748b', marginTop: '24px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }
