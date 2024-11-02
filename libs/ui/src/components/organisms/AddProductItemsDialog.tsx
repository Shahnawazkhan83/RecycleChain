import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { useFormAddProductItems } from '@recycle-chain/forms/src/addProductItems'
import { useAccount } from '@recycle-chain/util/src/hooks/ether'
import { Button } from '../atoms/Button'
import { Form } from '../atoms/Form'
import { Dialog } from '../atoms/Dialog'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { HtmlInput } from '../atoms/HtmlInput'
import { addProductItems } from '@recycle-chain/util/src/actions/addProductItems'
import { namedOperations } from '@recycle-chain/network/src/gql/generated'
import { toast } from '../molecules/Toast'

export interface IAddProductItemsDialogProps {
  productId: string
}

export const AddProductItems = ({ productId }: IAddProductItemsDialogProps) => {
  const [open, setOpen] = useState(false)
  const client = useApolloClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormAddProductItems()
  const { contract } = useAccount()
  const [loading, setLoading] = useState(false)

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2"
      >
        Add items
      </Button>
      <Dialog open={open} setOpen={setOpen} title={'Add product items'}>
        <Form
          onSubmit={handleSubmit(async ({ quantity }) => {
            setLoading(true)

            if (!contract) {
              toast('❌Invalid contract.')
              return
            }

            const status = await addProductItems({
              contract,
              payload: { productId, quantity },
            })

            if (status) {
              reset()
              client.refetchQueries({
                include: [
                  namedOperations.Query.Product,
                  namedOperations.Query.ProductItems,
                ],
              })
              setOpen(false)
              toast('🎉 Product items created successfully! 🚀');
            } else {
              toast('❌ Product items creation failed. Please try again.');
            }
            setLoading(false)
          })}
        >
          <div className="text-lg font-semibold  ">Product #{productId}</div>
          <HtmlLabel title="Quantity" error={errors.quantity?.message}>
            <HtmlInput
              placeholder="Enter quantity"
              {...register('quantity', { valueAsNumber: true })}
            />
          </HtmlLabel>{' '}
          <Button loading={loading} type="submit">
            Add Items
          </Button>
        </Form>
      </Dialog>
    </>
  )
}
