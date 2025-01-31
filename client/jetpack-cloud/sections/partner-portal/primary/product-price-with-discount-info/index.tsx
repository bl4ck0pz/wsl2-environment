import formatCurrency from '@automattic/format-currency';
import classNames from 'classnames';
import { useTranslate } from 'i18n-calypso';
import { useSelector } from 'calypso/state';
import { APIProductFamilyProduct } from 'calypso/state/partner-portal/types';
import { getProductsList } from 'calypso/state/products-list/selectors';
import { getProductPricingInfo } from '../../issue-license-v2/lib/pricing';

import './style.scss';

interface Props {
	product: APIProductFamilyProduct;
	hideDiscount?: boolean;
	quantity?: number;
	compact?: boolean;
}

export default function ProductPriceWithDiscount( {
	product,
	hideDiscount,
	quantity = 1,
	compact,
}: Props ) {
	const translate = useTranslate();

	const userProducts = useSelector( ( state ) => getProductsList( state ) );
	const isDailyPricing = product.price_interval === 'day';

	const isBundle = quantity > 1;

	const { actualCost, discountedCost, discountPercentage } = getProductPricingInfo(
		userProducts,
		product,
		quantity
	);

	return (
		<div>
			<div
				className={ classNames( 'product-price-with-discount__price', { 'is-compact': compact } ) }
			>
				{ formatCurrency( discountedCost, product.currency ) }
				{
					// Display discount info only if there is a discount
					discountPercentage > 0 && ! hideDiscount && (
						<>
							{ compact && (
								<span className="product-price-with-discount__price-old">
									{ formatCurrency( actualCost, product.currency ) }
								</span>
							) }

							<span className="product-price-with-discount__price-discount">
								{ translate( 'Save %(discountPercentage)s%', {
									args: {
										discountPercentage,
									},
								} ) }
							</span>

							{ ! compact && (
								<div>
									<span className="product-price-with-discount__price-old">
										{ formatCurrency( actualCost, product.currency ) }
									</span>
								</div>
							) }
						</>
					)
				}
			</div>
			<div className="product-price-with-discount__price-interval">
				{ isDailyPricing &&
					( isBundle
						? translate( '/USD per bundle per day' )
						: translate( '/USD per license per day' ) ) }
				{ product.price_interval === 'month' &&
					( isBundle
						? translate( '/USD per bundle per month' )
						: translate( '/USD per license per month' ) ) }
			</div>
		</div>
	);
}
