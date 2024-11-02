import { useAccount } from '@recycle-chain/util/src/hooks/ether'
import { useApolloClient } from '@apollo/client'
import { Button } from '../atoms/Button'
import { useState } from 'react'
import { toast } from '../molecules/Toast'
import { updateProductItemStatus } from '@recycle-chain/util/src/actions/updateProductItemStatus'
import {
  ProductStatus,
  namedOperations,
} from '@recycle-chain/network/src/gql/generated'

const statusToButtonText: Record<ProductStatus, string> = {
  [ProductStatus.Manufactured]: 'Sell item',
  [ProductStatus.Sold]: 'Return item',
  [ProductStatus.Returned]: 'Recycle item',
  [ProductStatus.Recycled]: 'Recycled',
}

export const UpdateProductItemStatusButton = ({
  id,
  currentStatus,
}: {
  id: string
  currentStatus: ProductStatus
}) => {
  const { contract } = useAccount()
  const client = useApolloClient()
  const [loading, setLoading] = useState(false)

  return (
    <Button
      loading={loading}
      variant="text"
      disabled={currentStatus === ProductStatus.Recycled}
      onClick={async () => {
        if (!contract) {
          toast('Action failed.')
          return
        }
        setLoading(true)
        const status = await updateProductItemStatus({
  contract,
  payload: { productItemIds: [id], currentStatus },
});

if (status) {
  // Map the current status to a readable message
  const statusMessages = {
    [ProductStatus.Manufactured]: '🎉 Your product has been sold successfully! Thank you for your business! 🥳',
    [ProductStatus.Sold]: '🎉 Product has been returned successfully. We appreciate your feedback! 😊',
    [ProductStatus.Returned]: '🎉 Congratulations! You have successfully recycled the product. Thank you for being eco-friendly! ♻️',
    [ProductStatus.Recycled]: '🎉 Congratulations! You have successfully recycled the product. Thank you for being eco-friendly! ♻️',
  };

  // Get the appropriate message based on the currentStatus
  const message = statusMessages[currentStatus] || 'Item status updated.';

  // Show the toast message
  toast(message);

  client.refetchQueries({
    include: [
      namedOperations.Query.ProductItems,
      namedOperations.Query.Product,
    ],
  });
}else {
          toast('Sorry! Something Went Wrong😔🧐')
        }
        setLoading(false)
      }}
    >
      {statusToButtonText[currentStatus]}
    </Button>
  )
}
