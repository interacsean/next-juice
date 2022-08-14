import React from 'react';
import { Box, Button, Text, FormControl, Input, FormLabel } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import EstimateForm, { Estimates } from 'web/components/modules/EstimateForm/EstimateForm';

interface CreateEstimatePublicProps {
  onCreate: (est: Estimates) => void;
};

const CreateEstimate: React.FC<CreateEstimatePublicProps> = (
  _props: CreateEstimatePublicProps,
) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = React.useCallback(
    (data) => {
      console.log(data);
    },
    [],
  );

  return (
    <Box>
      <Box mb={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input name="name" placeholder="Estimate name" {...register('name')} />
          </FormControl>
        </form>
      </Box>
      <EstimateForm />
    </Box>
  );
};

export default CreateEstimate;
