package io.github.erp.service.criteria;

import io.github.erp.domain.enumeration.CurrencyTypes;
import java.io.Serializable;
import java.util.Objects;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.BigDecimalFilter;
import tech.jhipster.service.filter.BooleanFilter;
import tech.jhipster.service.filter.DoubleFilter;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.FloatFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LocalDateFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link io.github.erp.domain.Invoice} entity. This class is used
 * in {@link io.github.erp.web.rest.InvoiceResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /invoices?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class InvoiceCriteria implements Serializable, Criteria {

    /**
     * Class for filtering CurrencyTypes
     */
    public static class CurrencyTypesFilter extends Filter<CurrencyTypes> {

        public CurrencyTypesFilter() {}

        public CurrencyTypesFilter(CurrencyTypesFilter filter) {
            super(filter);
        }

        @Override
        public CurrencyTypesFilter copy() {
            return new CurrencyTypesFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter invoiceNumber;

    private LocalDateFilter invoiceDate;

    private BigDecimalFilter invoiceAmount;

    private CurrencyTypesFilter currency;

    private LongFilter paymentId;

    private LongFilter dealerId;

    private StringFilter fileUploadToken;

    private StringFilter compilationToken;

    private LongFilter paymentLabelId;

    private LongFilter placeholderId;

    private Boolean distinct;

    public InvoiceCriteria() {}

    public InvoiceCriteria(InvoiceCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.invoiceNumber = other.invoiceNumber == null ? null : other.invoiceNumber.copy();
        this.invoiceDate = other.invoiceDate == null ? null : other.invoiceDate.copy();
        this.invoiceAmount = other.invoiceAmount == null ? null : other.invoiceAmount.copy();
        this.currency = other.currency == null ? null : other.currency.copy();
        this.paymentId = other.paymentId == null ? null : other.paymentId.copy();
        this.dealerId = other.dealerId == null ? null : other.dealerId.copy();
        this.fileUploadToken = other.fileUploadToken == null ? null : other.fileUploadToken.copy();
        this.compilationToken = other.compilationToken == null ? null : other.compilationToken.copy();
        this.paymentLabelId = other.paymentLabelId == null ? null : other.paymentLabelId.copy();
        this.placeholderId = other.placeholderId == null ? null : other.placeholderId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public InvoiceCriteria copy() {
        return new InvoiceCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public LongFilter id() {
        if (id == null) {
            id = new LongFilter();
        }
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getInvoiceNumber() {
        return invoiceNumber;
    }

    public StringFilter invoiceNumber() {
        if (invoiceNumber == null) {
            invoiceNumber = new StringFilter();
        }
        return invoiceNumber;
    }

    public void setInvoiceNumber(StringFilter invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public LocalDateFilter getInvoiceDate() {
        return invoiceDate;
    }

    public LocalDateFilter invoiceDate() {
        if (invoiceDate == null) {
            invoiceDate = new LocalDateFilter();
        }
        return invoiceDate;
    }

    public void setInvoiceDate(LocalDateFilter invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public BigDecimalFilter getInvoiceAmount() {
        return invoiceAmount;
    }

    public BigDecimalFilter invoiceAmount() {
        if (invoiceAmount == null) {
            invoiceAmount = new BigDecimalFilter();
        }
        return invoiceAmount;
    }

    public void setInvoiceAmount(BigDecimalFilter invoiceAmount) {
        this.invoiceAmount = invoiceAmount;
    }

    public CurrencyTypesFilter getCurrency() {
        return currency;
    }

    public CurrencyTypesFilter currency() {
        if (currency == null) {
            currency = new CurrencyTypesFilter();
        }
        return currency;
    }

    public void setCurrency(CurrencyTypesFilter currency) {
        this.currency = currency;
    }

    public LongFilter getPaymentId() {
        return paymentId;
    }

    public LongFilter paymentId() {
        if (paymentId == null) {
            paymentId = new LongFilter();
        }
        return paymentId;
    }

    public void setPaymentId(LongFilter paymentId) {
        this.paymentId = paymentId;
    }

    public LongFilter getDealerId() {
        return dealerId;
    }

    public LongFilter dealerId() {
        if (dealerId == null) {
            dealerId = new LongFilter();
        }
        return dealerId;
    }

    public void setDealerId(LongFilter dealerId) {
        this.dealerId = dealerId;
    }

    public StringFilter getFileUploadToken() {
        return fileUploadToken;
    }

    public StringFilter fileUploadToken() {
        if (fileUploadToken == null) {
            fileUploadToken = new StringFilter();
        }
        return fileUploadToken;
    }

    public void setFileUploadToken(StringFilter fileUploadToken) {
        this.fileUploadToken = fileUploadToken;
    }

    public StringFilter getCompilationToken() {
        return compilationToken;
    }

    public StringFilter compilationToken() {
        if (compilationToken == null) {
            compilationToken = new StringFilter();
        }
        return compilationToken;
    }

    public void setCompilationToken(StringFilter compilationToken) {
        this.compilationToken = compilationToken;
    }

    public LongFilter getPaymentLabelId() {
        return paymentLabelId;
    }

    public LongFilter paymentLabelId() {
        if (paymentLabelId == null) {
            paymentLabelId = new LongFilter();
        }
        return paymentLabelId;
    }

    public void setPaymentLabelId(LongFilter paymentLabelId) {
        this.paymentLabelId = paymentLabelId;
    }

    public LongFilter getPlaceholderId() {
        return placeholderId;
    }

    public LongFilter placeholderId() {
        if (placeholderId == null) {
            placeholderId = new LongFilter();
        }
        return placeholderId;
    }

    public void setPlaceholderId(LongFilter placeholderId) {
        this.placeholderId = placeholderId;
    }

    public Boolean getDistinct() {
        return distinct;
    }

    public void setDistinct(Boolean distinct) {
        this.distinct = distinct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final InvoiceCriteria that = (InvoiceCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(invoiceNumber, that.invoiceNumber) &&
            Objects.equals(invoiceDate, that.invoiceDate) &&
            Objects.equals(invoiceAmount, that.invoiceAmount) &&
            Objects.equals(currency, that.currency) &&
            Objects.equals(paymentId, that.paymentId) &&
            Objects.equals(dealerId, that.dealerId) &&
            Objects.equals(fileUploadToken, that.fileUploadToken) &&
            Objects.equals(compilationToken, that.compilationToken) &&
            Objects.equals(paymentLabelId, that.paymentLabelId) &&
            Objects.equals(placeholderId, that.placeholderId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            invoiceNumber,
            invoiceDate,
            invoiceAmount,
            currency,
            paymentId,
            dealerId,
            fileUploadToken,
            compilationToken,
            paymentLabelId,
            placeholderId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InvoiceCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (invoiceNumber != null ? "invoiceNumber=" + invoiceNumber + ", " : "") +
            (invoiceDate != null ? "invoiceDate=" + invoiceDate + ", " : "") +
            (invoiceAmount != null ? "invoiceAmount=" + invoiceAmount + ", " : "") +
            (currency != null ? "currency=" + currency + ", " : "") +
            (paymentId != null ? "paymentId=" + paymentId + ", " : "") +
            (dealerId != null ? "dealerId=" + dealerId + ", " : "") +
            (fileUploadToken != null ? "fileUploadToken=" + fileUploadToken + ", " : "") +
            (compilationToken != null ? "compilationToken=" + compilationToken + ", " : "") +
            (paymentLabelId != null ? "paymentLabelId=" + paymentLabelId + ", " : "") +
            (placeholderId != null ? "placeholderId=" + placeholderId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}