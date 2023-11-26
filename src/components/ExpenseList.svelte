<script>
    import { expenses } from "../stores/expenses.js";

</script>

<div class="container">
{#each $expenses as expense}
	<div class="card">
    <div>
    <p>Category - {expense.category}</p>
    <p>Amount - {expense.amount}</p>
    <p>Expense Date - {expense.expenseDate}</p>
    </div>
    <div class="button-container">
    <button on:click={() => expenses.delete(expense.expenseID)}>Delete</button>
    </div>
    </div>
{/each}
</div>

<style>
    .container {
        display: flex;
        flex-flow: column;
        align-items: center;
        margin-top: 12px;
    }
    .card {
        display:flex;
        flex-flow: row;
        align-items: flex-start;
        width: 320px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        margin-bottom: 10px;
        padding: 16px;
        border-radius: 8px;
        background: #5151bf;
        color: #fff;
    }
    .card p {
        margin: 8px;
    }
    .button-container {
    text-align: right;
    flex-grow: 1;
    }
</style>