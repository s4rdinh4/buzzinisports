import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  email?: string
  company?: string
  role?: string
  phone?: string
  location?: string
  participants?: string
  message?: string
}

function CompanyInquiryEmail(data: Props) {
  const fields = [
    ['Nome', data.name],
    ['E-mail corporativo', data.email],
    ['Empresa', data.company],
    ['Cargo', data.role],
    ['Telefone', data.phone],
    ['Cidade e estado', data.location],
    ['Participantes estimados', data.participants],
    ['Mensagem', data.message],
  ]
  return (
    <Html lang="pt-BR" dir="ltr">
      <Head />
      <Preview>Nova solicitação de proposta para Buzzini Empresas.</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={brand}>BUZZINI SPORTS</Text>
          <Heading style={heading}>Nova solicitação de proposta</Heading>
          {fields.map(([label, value]) => (
            <Text key={label} style={field}>
              <strong>{label}:</strong> {value || 'Não informado'}
            </Text>
          ))}
          <Text>O solicitante autorizou o envio dos dados para contato comercial.</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: CompanyInquiryEmail,
  subject: (data) => `Plano Empresarial | ${typeof data['company'] === 'string' ? data['company'] : 'Nova solicitação'}`,
  displayName: 'Solicitação — Buzzini Empresas',
  to: 'assessoria@buzzini.com.br',
  previewData: {
    name: 'Contato de exemplo', email: 'contato@example.com', company: 'Empresa de exemplo',
    role: 'Recursos Humanos', location: 'Bebedouro — SP', participants: '11–30 pessoas',
    message: 'Gostaria de conhecer a proposta para nossa equipe.',
  },
} satisfies TemplateEntry

const body = { backgroundColor: '#ffffff', color: '#272727', fontFamily: 'Arial, sans-serif' }
const container = { maxWidth: '600px', padding: '32px 24px' }
const brand = { color: '#EC5903', fontWeight: '700' }
const heading = { fontSize: '24px', lineHeight: '32px' }
const field = { fontSize: '14px', lineHeight: '22px', whiteSpace: 'pre-wrap' as const }