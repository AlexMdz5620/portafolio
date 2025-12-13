import { ContactForm } from '@/schemas/zodSchema';
import { Body, Container, Head, Heading, Html, Section, Text } from '@react-email/components';

export function ContactTemplate({ name, email, subject, message }: ContactForm) {
    const styles = {
        body: { fontFamily: 'Arial, sans-serif', backgroundColor: '#f6f9fc' },
        container: { maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '20px' },
        h1: { color: '#be3144' },
        section: { margin: '20px 0' },
        messageBox: { backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '5px' },
        messageText: { whiteSpace: 'pre-wrap' }

    }
    return (
        <Html>
            <Head />
            <Body style={styles.body}>
                <Container style={styles.container}>
                    <Heading style={styles.h1}>
                        Nuevo Mensaje del Portafolio
                    </Heading>
                    <Section style={styles.section}>
                        <Text><strong>De:</strong> {name} ({email}) </Text>
                        <Text><strong>Asunto:</strong> {subject} </Text>
                    </Section>
                    <Section style={styles.messageBox}>
                        <Text style={styles.messageText}>{message}</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    )
}