
<script>
  import { createEventDispatcher } from "svelte";
    import { createForm } from "svelte-forms-lib";
    import * as yup from "yup";

    const categories = ['entertainment', 'food', 'travel', 'rent', 'gadgets'];
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const dispatcher = createEventDispatcher()
    const { form, errors, handleSubmit, handleReset } = createForm({
      initialValues: {
        category: "",
        expenseDate: "",
        amount:0
      },
      validationSchema: yup.object().shape({
        category: yup
          .string()
          .oneOf(categories)
          .required(),
        expenseDate: yup.date().min(threeMonthsAgo).max(new Date()).required(),
        amount: yup.number().min(1).max(999999).required(),
      }),
      onSubmit: values => {
        dispatcher("add_expense", {...values})
        handleReset();
      }
    });
  </script>

  <form on:submit={handleSubmit} action="">
    <label for="category">Category</label>
    <select
      id="category"
      name="category"
      bind:value={$form.category}>
      {#each categories as category}
        <option value={category}>{category}</option>
      {/each}
    </select>
    {#if $errors.category}
      <small>{$errors.category}</small>
    {/if}

    <label for="amount">Amount</label>
    <input
      id="amount"
      name="amount"
      type="number"
      bind:value={$form.amount}
    />
    {#if $errors.amount}
      <small>{$errors.amount}</small>
    {/if}

    <label for="expenseDate">Expense Date</label>
    <input
      id="expenseDate"
      name="expenseDate"
      type="date"
      bind:value={$form.expenseDate}
    />
    {#if $errors.expenseDate}
      <small>{$errors.expenseDate}</small>
    {/if}
    <button class="expense-btn" type="submit">Add Expense</button>
  </form>

<style>
  form {
    display: flex;
    flex-flow: column;
    width: 100%;
    align-items: center
  }
  input,
  select {
    font-size: inherit;
    max-width: 400px;
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    border: 1px solid var(--grey);
    border-radius: 4px;
    transition: all 150ms ease;
    background: var(--white);
  }

  select {
    height: 45px;
  }

  input:focus,
  select:focus{
    outline: none;
    box-shadow: 0 0 0 4px rgb(227, 227, 245);
    border-color: var(--grey);
  }

  input:disabled,
  select:disabled{
    color: #ccc;
  }

  .expense-btn {
    color: #fff;
    background-color: var(--primary);
    border: var(--grey-dark);
    text-transform: uppercase;
    letter-spacing: 1.8px;
    outline: none;
    border-radius: 4px;
    display: block;
    margin-top: 12px;
    line-height: 1.8;
    font-size: 12px;
    padding: 10px 18px;
    min-width: 120px;
    transition: all 150ms ease;
    cursor: pointer;
  }

  .expense-btn:disabled {
    background-color: var(--grey);
  }

  .expense-btn:focus:not(:disabled) {
    box-shadow: 0 0 0 4px var(--primary-light);
  }

  .expense-btn:hover:not(:disabled) {
    background-color: var(--primary-dark);
  }

  label {
    display: block;
    margin-top: 20px;
    margin-bottom: 4px;
    font-size: 15px;
    letter-spacing: 1.9px;
    line-height: 2;
  }

  /* used for errors */
  small {
    display: block;
    font-size: 12px;
    color: var(--red);
    margin-top: 10px;
  }
</style>