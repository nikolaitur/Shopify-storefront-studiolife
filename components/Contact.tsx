import {
  GridItem,
  SimpleGrid,
  Button,
  Textarea,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';

export default function ContactForm() {
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
    onSubmit: async (values) => {
      await fetch("https://submit-form.com/qtpgENTs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });
      
      toast({
        title: "Form Submitted!",
        description:
          "We've received your response and will respond as soon as possible!",
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <SimpleGrid templateColumns={`repeat(2, 1fr)`} gap={6} w="full">
        <GridItem colSpan={[2, 1]}>
          <Input
            placeholder="Enter your name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </GridItem>
        <GridItem colSpan={[2, 1]}>
          <Input
            placeholder="phone number"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
        </GridItem>
        <GridItem colSpan={[2]}>
          <Input
            name="email"
            type="email"
            placeholder="email address"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </GridItem>
        <GridItem colSpan={[2]}>
          <Textarea
            placeholder="your message"
            rows={5}
            name="message"
            onChange={formik.handleChange}
            value={formik.values.message}
          />
        </GridItem>
        <GridItem>
          <Button
            isLoading={formik.isSubmitting}
            type="submit"
            loadingText="Submitting..."
          >
            Submit ✓
          </Button>
        </GridItem>
      </SimpleGrid>
    </form>
  );
}
